import Invitation from "../models/invitation.js";
import UserModel from "../models/user.js";
import Workspace from "../models/workspace.js";

export const index = (req, res) => {
  const { userId } = req.params;
  Workspace.find({ userId })
    .then((workspaces) => res.status(200).json({ workspaces }))
    .catch((error) => res.status(500).json({ error }));
};

export const getWorkspace = async (req, res) => {
  const { workspaceId } = req.params;
  try {
    // Find the workspace with populated team member details
    const workspace = await Workspace.findById(workspaceId)
      .populate("team.userId", "fullName email") // Populate only fullName and email fields
      .exec();

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
     
    }).sort({createdAt : -1}).exec();

    // Combine the registered team members with the pending invitations
    const teamWithInvitations = workspace.team.concat(
      pendingInvitations.map((invite) => ({
        userId: null, // No User ID since the user is not registered
        email: invite.email,
        invited: true, // This flag can help distinguish invited members who haven't registered
        status: invite.status
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
  const { name, projects, userId, team, people } = req.body;

  try {
    const workspace = await Workspace.create({
      name,
      numberOfProjects: projects,
      numberOfPeople: people,
      userId,
    });



    // Create an array of invitation creation promises
    const invitationPromises = team.map((member) => {
        const link =  `${process.env.APP_URL}/workspace/accept-invite/${workspace._id}/${member.email}`;
      const invitation = new Invitation({
        email: member.email,
        workspace: workspace._id,
        invitedBy: userId,
        link 
      });
      // Save and return the invitation promise
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
    const { team, invitingUserId, workspaceId } = req.body;

    const invitationPromises = team.map((_team) => {
        const link = `${process.env.APP_URL}/workspace/accept-invite/${workspaceId}/${_team}`;
      const newInvitation = new Invitation({
        email: _team,
        workspace: workspaceId,
        invitedBy: invitingUserId,
        link: link,
      });
      return newInvitation.save();
    });
    await Promise.all(invitationPromises);

    // Send email to the unregistered user with instructions on how to join (implementation omitted)

    res.status(200).json({ message: "Invitation sent successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
