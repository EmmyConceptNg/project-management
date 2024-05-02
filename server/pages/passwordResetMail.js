export const passwordResetMail = (user, link) => {
  return ` <center>
     <table data-group="Header" data-module="Center Logo" data-thumbnail="/editor/assets/local/thumbnails/2.png"
         border="0" width="100%" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
         <tr>
             <td data-bgcolor="Body Bgcolor" align="center" valign="middle" bgcolor="#F1F1F1"
                 style="background-color: #F1F1F1;">
                 <table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row"
                     style="width:600px;max-width:600px;">
                     <tr>
                         <td data-bgcolor="Bgcolor" align="center" bgcolor="#FFFFFF"
                             style="background-color: rgb(95, 193, 196);">
                             <table width="520" border="0" cellpadding="0" passwordResetMailcellspacing="0" align="center"
                                 class="row" style="width:520px;max-width:520px;">
                                 <tr>
                                     <td align="center" class="container-padding">
                                         <table border="0" width="100%" cellpadding="0" cellspacing="0"
                                             align="center" style="width:100%; max-width:100%;">
                                             <tr>
                                                 <td data-resizable-height=""
                                                     style="font-size:40px;height:40px;line-height:40px;">&nbsp;</td>
                                             </tr>
                                             <tr>
                                                 <td align="center" valign="middle"><a href="${process.env.APP_URL}"
                                                         style="text-decoration:none;border:0"><img data-image="Logo"
                                                             width="140" border="0" alt="logo"
                                                             style="width:140px;border:0px;display:inline!important;"
                                                             src="${process.env.APP_URL}/assets/images/logo.svg"></a>
                                                 </td>
                                             </tr>
                                             <tr>
                                                 <td data-resizable-height=""
                                                     style="font-size:20px;height:20px;line-height:20px;">&nbsp;</td>
                                             </tr>
                                         </table>
                                     </td>
                                 </tr>
                             </table>
                         </td>
                     </tr>
                 </table>








             </td>
         </tr>
     </table>
     <table data-group="Other Module" data-module="Info Description"
         data-thumbnail="/editor/assets/local/thumbnails/8.png" border="0" width="100%" align="center"
         cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;">
         <tr>
             <td data-bgcolor="Body Bgcolor" align="center" valign="middle" bgcolor="#F1F1F1"
                 style="background-color: #F1F1F1;">
                 <table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="row"
                     style="width:600px;max-width:600px;">
                     <tr>
                         <td data-bgcolor="Bgcolor" align="center" bgcolor="#FFFFFF" style="background-color: #FFFFFF;">
                             <table width="520" border="0" cellpadding="0" cellspacing="0" align="center"
                                 class="row" style="width:520px;max-width:520px;">
                                 <tr>
                                     <td align="center" class="container-padding">
                                         <table border="0" width="100%" cellpadding="0" cellspacing="0"
                                             align="center" style="width:100%; max-width:100%;">
                                             <tr>
                                                 <td data-resizable-height=""
                                                     style="font-size:20px;height:20px;line-height:20px;">&nbsp;</td>
                                             </tr>
                                             <tr>
                                                 <td data-text="Title" data-font="Primary" align="center"
                                                     valign="middle"
                                                     style="font-family:'Poppins', sans-serif;color:#191919;font-size:32px;line-height:42px;font-weight:700;letter-spacing:0px;padding:0;padding-bottom:10px;">
                                                     Password Reset</td>
                                             </tr>
                                             <tr>
                                                 <td data-text="Description" data-font="Primary" align="center"
                                                     valign="middle"
                                                     style="font-family:'Poppins', sans-serif;color:#939393;font-size:14px;line-height:24px;font-weight:400;letter-spacing:0px;padding:0;padding-bottom:30px;">
                                                     Hello ${user.fullName}, click on the link below to reset your password.</td>
                                             </tr>
                                             <tr>
                                                 <td align="center" valign="middle">
                                                     <table border="0" align="center" cellpadding="0"
                                                         cellspacing="0">
                                                         <tr>
                                                             <td data-btn="Button Large" align="center"
                                                                 style="display: block; background-color: rgb(95, 193, 196); border-radius: 50px;">
                                                                 <a data-font="Primary" href="${link}"
                                                                     style="color: rgb(255, 255, 255); font-family: Poppins, sans-serif; font-size: 14px; font-weight: 600; letter-spacing: 0px; line-height: 24px; display: block; text-decoration: none; white-space: nowrap; padding: 12px 30px;">Reset</a>
                                                             </td>
                                                         </tr>
                                                     </table>
                                                 </td>
                                             </tr>
                                             <tr>
                                                 <td data-resizable-height=""
                                                     style="font-size:20px;height:20px;line-height:20px;">&nbsp;</td>
                                             </tr>
                                         </table>
                                     </td>
                                 </tr>
                             </table>
                         </td>
                     </tr>
                 </table>
             </td>
         </tr>
     </table>
 </center>
`;
};
