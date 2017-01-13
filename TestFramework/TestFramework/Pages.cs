using OpenQA.Selenium;
using OpenQA.Selenium.Support.PageObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestFramework
{
    public static class Pages {
        public static HomePage HomePage {
            get {
                var homePage = new HomePage();
                PageFactory.InitElements(Browser.Driver, homePage);
                return homePage;
            }
        }
    }

    public class HomePage {
        static string Url = "https://pluralsight.com";

        private static string Title = "Pluralsight | Unlimited Online Developer, IT and Creative Training";

        [FindsBy(How = How.LinkText, Using = "Business")]
        private IWebElement menuLink;

        public void Goto() {
            Browser.Goto(Url);
        }

        public bool IsAt() {
            return Browser.Title == Title;
        }

        public void SelectBusinessFromMenu(string businessName) {
            menuLink.Click();
            //businessLink.Click();
            //Find business link
        }

        public bool IsAtBusinessPage(string businessName) {
            var businessPage = new BusinessPage();
            PageFactory.InitElements(Browser.Driver, businessPage);
            return businessPage.BusinessName == businessName;
        }

    }

    public class BusinessPage {

        [FindsBy]
        private IWebElement businessName;

        public string BusinessName {
            return businessName;
        }
    }
}
