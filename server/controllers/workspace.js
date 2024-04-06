import Invitation from "../models/invitation.js";
import UserModel from "../models/user.js";
import Workspace from "../models/workspace.js";
import { InviteMail } from "../pages/InviteMail.js";
import { sendMail } from "./Mail.js";

export const index = (req, res) => {
  const { userId } = req.params;
  const query = {
    $or: [
      { userId: userId }, 
      { "team.userId": userId }, 
    ],
  };

  Workspace.find(query)
    .populate("team.userId", "fullName email timeZone phone _id")
    .then((workspaces) => res.status(200).json({ workspaces }))
    .catch((error) => res.status(500).json({ error }));
};

export const getWorkspace = async (req, res) => {
  const { workspaceId } = req.params;
  try {
    // Find the workspace with populated team member details
    const workspace = await Workspace.findById(workspaceId)
      .populate("team.userId", "fullName email timeZone phone _id");
      

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found." });
    }

    // Get the IDs of the registered team members for comparison
    const registeredMemberIds = workspace.team.map((member) =>
      member.userId.toString()
    );

    // Find invitations for the workspace that do not correspond to registered members
    const pendingInvitations = await Invitation.find({
      workspace: workspace._id,
      email: { $nin: registeredMemberIds }, // $nin selects the documents where the value of the field is not in the specified array
     
    }).sort({createdAt : -1})

    const teamWithInvitations = workspace.team
      .map((member) => ({
        ...member.toObject(), 
        invited: false, 
        status: "accepted", 
      }))
      .concat(
        pendingInvitations.map((invite) => ({
          userId: { _id: null, email: invite.email, fullName: null }, // Mock 'userId' object structure
          invited: true,
          status: invite.status,
        }))
      );

    res
      .status(200)
      .json({ workspace: workspace.toObject(), team: teamWithInvitations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  const { name, projects, userId, team, people, workspaceName } = req.body;

  try {
    const workspace = await Workspace.create({
      name,
      numberOfProjects: projects,
      numberOfPeople: people,
      userId,
      team: {
        userId: userId,
        specialityClass: "owner",
      },
    });



    // Create an array of invitation creation promises
    const invitationPromises = team.map((member) => {
        const link =  `${process.env.APP_URL}/api/workspace/accept-invite/${workspace._id}/${member}`;
        
      const invitation = new Invitation({
        email: member,
        workspace: workspace._id, 
        invitedBy: userId,
        url : link,
      });
      
        sendMail(
          member,
          "Invitation to join workspace",
          InviteMail(member, name, link)
        );
      return invitation.save();
    });

    // Wait for all invitation promises to resolve
    await Promise.all(invitationPromises);

    res.status(200).json({ workspace });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const invite = async (req, res) => {
  try {
    const { team, invitingUserId, workspaceId, workspaceName } = req.body;

    const invitationPromises = team.map((_team) => {
        const link = `${process.env.APP_URL}/api/workspace/accept-invite/${workspaceId}/${_team}`;
        console.log(workspaceName)
      const newInvitation =  new Invitation({
        email: _team,
        workspace: workspaceId,
        invitedBy: invitingUserId,
        url: link,
      });
      sendMail(
        _team,
        "Invitation to join workspace",
        InviteMail(_team, workspaceName, link)
      );
      return newInvitation.save();
    });
    await Promise.all(invitationPromises);

    // Send email to the unregistered user with instructions on how to join (implementation omitted)

    res.status(200).json({ message: "Invitation sent successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const acceptInvite = async (req, res) => {
  const { workspaceId, userEmail } = req.params;

  try {
    // First, check if the user exists based on the provided email
    const userExists = await UserModel.findOne({ email: userEmail });

    if (!userExists) {
      // If the user does not exist, redirect to a signup page
      return res.redirect(
        `${process.env.FRONTEND_URL}?workspace=${workspaceId}&email=${userEmail}`
      );
    } else {
      // If the user exists, check if they are already in the workspace's team
      const workspace = await Workspace.findById(workspaceId);
      const isMember = workspace.team.some((teamMember) =>
        teamMember.userId.equals(userExists._id)
      );

      if (!isMember) {
        // If the user is not already a team member, add them to the team
        try {
          await Workspace.findOneAndUpdate(
            { _id: workspaceId },
            { $push: { team: { userId: userExists._id } } },
            { new: true }
          );

          await Invitation.findOneAndDelete({
            email: userExists.email,
            workspace: workspaceId,
          });
        } catch (error) {
          console.error("Error updating workspace:", error);
          return res
            .status(500)
            .json({ error: "An error occurred while updating the workspace." });
        }
      }
      // Redirect to the login page after handling invitation acceptance
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?workspace=${workspaceId}&email=${userEmail}`
      );
    }
  } catch (err) {
    // Handle unexpected errors
    console.error("Error accepting invite:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while accepting the invitation." });
  }
};