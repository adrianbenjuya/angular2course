using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using TestFramework;

namespace Tests {

    [TestClass]
    public class UnitTest1 {

        [TestMethod]
        public void Can_Go_To_HomePage() {
            Pages.HomePage.Goto();
            Assert.IsTrue(Pages.HomePage.IsAt());
        }

        [TestMethod]
        public void Can_Go_To_Business_Page_From_Menu() {
            Pages.HomePage.Goto();
            Pages.HomePage.SelectBusinessFromMenu("Software Development");
            Assert.IsTrue(Pages.HomePage.IsAtBusinessPage("Software Develpment")); 
        }

        [TestCleanup]
        public void CleanUp() {
            Browser.Close();
        }
    }
}
