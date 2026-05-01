import ManualSection from "./ManualSection.jsx";
import ManualStep from "./ManualStep.jsx";
import ManualTip from "./ManualTip.jsx";

const UserManual = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          User Manual
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          A quick guide to help you understand and use the application
          effectively.
        </p>
      </header>

      <ManualSection title="Getting Started">
        <ManualStep number={1} title="Search for information">
          Use the search bar on the home page to look for topics, pages, or
          keywords.
        </ManualStep>

        <ManualStep number={2} title="Open a result">
          Click any search result to open the page and view its content.
        </ManualStep>

        <ManualTip>
          You can right-click selected text to instantly search for it.
        </ManualTip>
      </ManualSection>

      <ManualSection title="Using Tabs">
        <ManualStep number={1} title="Open new tabs">
          Searches and pages open in tabs so you can explore multiple topics at
          once.
        </ManualStep>

        <ManualStep number={2} title="Switch between tabs">
          Click on a tab to make it active.
        </ManualStep>
      </ManualSection>

      <ManualSection title="AI Overview">
        <ManualStep number={1} title="Generate an overview">
          Select text or search for a topic and request an AI-generated
          overview.
        </ManualStep>

        <ManualStep number={2} title="Premium access">
          AI-generated summaries are available to premium users.
        </ManualStep>

        <ManualTip>
          If AI features are locked, you can upgrade your account to unlock
          them.
        </ManualTip>
      </ManualSection>

      <ManualSection title="Account & Access">
        <ManualStep number={1} title="Login">
          Use the login button in the top-right corner to access your account.
        </ManualStep>

        <ManualStep number={2} title="Premium features">
          Premium accounts unlock AI summaries and advanced tools.
        </ManualStep>
      </ManualSection>
    </div>
  );
};

export default UserManual;
