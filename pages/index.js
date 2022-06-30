import Head from 'next/head';
import Image from 'next/image';
import Banner from '../components/banner';
import Card from '../components/card/Card';
import styles from '../styles/Home.module.css';

import { fetchCoffeeStores } from '../lib/coffee-stores';

export async function getStaticProps(context) {
  const data = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores: data,
    },
  };
}

export default function Home(props) {
  const handelOnBannerClick = () => {
    console.log('Pressed');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Banner buttonText={'View stores nearby'} onClick={handelOnBannerClick} />
        <div className={styles.heroImage}>
          <Image src='/static/hero-image.png' width={700} height={400} />
        </div>
        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Troano Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((el, index) => (
                <Card
                  key={index}
                  name={el.name}
                  href={`/coffee-store/${el.id}`}
                  imageUrl={
                    el.imgUrl ||
                    'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                  }
                  className={styles.card}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
