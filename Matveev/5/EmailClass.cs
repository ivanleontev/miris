using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;
using System.Windows.Forms;

namespace DNS
{
    class EmailClass
    {
        public void SendEmail(string subject, string receipeint, string message, string filePath)
        {
            string from_Email = "kelgarzver@gmail.com";
            string from_Password = "PlaceofmyheaD24";
            MailAddress fromAddress = new MailAddress(from_Email);
            MailAddress toAddress = new MailAddress(receipeint);
            MailMessage mail = new MailMessage(fromAddress.Address, toAddress.Address);
            mail.Subject = subject;
            mail.Body = message;
            if (filePath != "")
            {
                Attachment attachment = new Attachment(filePath);
                mail.Attachments.Add(attachment);
            }
            SmtpClient client = new SmtpClient();
            client.Host = "smtp.gmail.com";
            client.Port = 587;
            client.EnableSsl = true;
            client.Timeout = 50000;
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential(from_Email, from_Password);
            try
            {
                client.Send(mail);
                MessageBox.Show("Отправлено");
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
        
    }
}
