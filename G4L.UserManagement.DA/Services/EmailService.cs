using G4L.UserManagement.BL.Models;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit.Text;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using G4L.UserManagement.BL.Interfaces;
using MailKit.Net.Smtp;
using G4L.UserManagement.BL.Entities;
using G4L.UserManagement.Infrustructure.Repositories;
using G4L.UserManagement.BL.Models.Request;
using Azure.Core;
using System.IO;
using MimeKit.Utils;
using Org.BouncyCastle.Asn1.Ocsp;
using System.Numerics;

namespace G4L.UserManagement.DA.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;
        private readonly IUserService _userService;
        

        public EmailService(IConfiguration config, IUserService userService)
        {
            _config = config;
            _userService = userService;
        }
        public async Task SendEmail(EmailDto request)
        {
            {
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse(_config.GetSection("EmailUsername").Value));
                email.To.Add(MailboxAddress.Parse(request.To));
                email.Subject = request.Subject;
                email.Body = new TextPart(TextFormat.Html) { Text = request.Body };

                // Create the email body using HTML
                var bodyBuilder = new BodyBuilder();
                bodyBuilder.HtmlBody = request.Body;

                // Adding an image to the email signature
                var image = bodyBuilder.LinkedResources.Add(Path.Combine("wwwroot", "images", "signature.png"));
                image.ContentId = MimeUtils.GenerateMessageId();
                //HTML tag to reference the image in the email body
                bodyBuilder.HtmlBody += $"<br><img src=\"cid:{image.ContentId}\" alt=\"Signature Image\">";

                email.Body = bodyBuilder.ToMessageBody();


                using var smtp = new SmtpClient();
                smtp.Connect(_config.GetSection("EmailHost").Value, 587, SecureSocketOptions.StartTls);
                smtp.Authenticate(_config.GetSection("EmailUsername").Value, _config.GetSection("EmailPassword").Value);
                smtp.Send(email);
                smtp.Disconnect(true);

            }
        }
    }
}
