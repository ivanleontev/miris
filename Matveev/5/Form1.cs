using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Net;

namespace DNS
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            string hostname = Dns.GetHostName();
            textBox3.Text = hostname;
            IPAddress[] addresses = Dns.GetHostAddresses(hostname);
            foreach (IPAddress addr in addresses)
            {
                textBox4.Text = addr.ToString();
            }
        }
        private void button1_Click_1(object sender, EventArgs e)
        {
            string host;

            host = textBox1.Text;
            IPAddress[] addresses = Dns.GetHostAddresses(host);
            foreach (IPAddress addr in addresses)
            {
                textBox2.Text = addr.ToString();
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            EmailClass obj = new EmailClass();
            obj.SendEmail(textBox6.Text, textBox5.Text, textBox7.Text, Filepath);
        }
        string Filepath;
        private void button3_Click(object sender, EventArgs e)
        {
            try
            {
                OpenFileDialog obj = new OpenFileDialog();
                if (obj.ShowDialog() == DialogResult.OK)
                {
                    Filepath = obj.FileName;
                    MessageBox.Show("Файл прикреплен");
                }
                
                else
                {
                    Filepath = "";
                }
            }
            catch (Exception ex)
            {

            }
        }
    }
}
