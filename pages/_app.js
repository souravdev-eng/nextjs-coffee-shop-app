import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <footer>
        <p>© 2022 Sourav</p>
      </footer>
    </>
  );
}

export default MyApp;
