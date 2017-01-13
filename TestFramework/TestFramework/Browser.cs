using System;
using OpenQA;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;

namespace TestFramework {
    public static class Browser {

        static IWebDriver webDriver = new FirefoxDriver();

        public static string Title {
            get {
                return webDriver.Title;
            }
        }

        public static ISearchContext Driver {
            get {
                return webDriver;
            }
        }

        public static void Goto(string Url) {
            webDriver.Url = Url;
        }

        public static void Close() {
            webDriver.Close();
        }
    }
}