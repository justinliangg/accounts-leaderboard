import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-background p-3 fixed bottom-0 w-full border-t-2">
      <div className="container mx-auto text-center">
        <p>
          Data sourced from Techt&apos;s{" "}
          <Link
            className="underline"
            rel="noopener noreferrer"
            target="_blank"
            href="https://docs.google.com/spreadsheets/d/145iM6uuFS9m-Rul65--eFJQq_Au7Z_BA4_CwkYwu2DI/edit#gid=0"
          >
            spreadsheet
          </Link>{" "}
          &#x2665;
        </p>
      </div>
    </footer>
  );
};

export default Footer;
