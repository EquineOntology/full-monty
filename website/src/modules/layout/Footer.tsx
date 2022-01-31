function Footer() {
  return (
    <footer
      style={{
        display: "flex",
        flex: 1,
        padding: "2rem 0",
        borderTop: "1px solid #eaeaea",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <a
        href="https://fratta.dev"
        target="_blank"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
        rel="noopener noreferrer"
      >
        Powered by the 🧠, ❤️, and 🙌 of Christian Fratta
      </a>
    </footer>
  );
}

export default Footer;
