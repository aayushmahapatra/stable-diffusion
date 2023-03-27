import { FC, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

const Home: FC = () => {
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const generate = async (description: string) => {
    setLoading(true);
    const result = await axios.get(
      `http://127.0.0.1:8000/?prompt=${description}`
    );
    setImage(result.data);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Stable Diffusion</title>
        <meta name="description" content="Stable diffusion app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="mt-8 text-2xl text-center border border-yellow-400 w-1/4 mx-auto p-2 rounded">
          Stable Diffusion 🚀
        </h1>
        <p className="w-2/3 mx-auto text-center my-10">
          Nextjs application that leverages the model trained by Stability AI and
          Runway ML to generate images using the Stable Diffusion Deep Learning
          model. The model can be found via github here:{" "}
          <Link
            href={"https://github.com/aayushmahapatra/stable-diffusion"}
            className="text-yellow-500 underline"
          >
            Github Repo.
          </Link>
        </p>
        <section className="flex justify-center">
          <input
            type="text"
            placeholder="describe image to generate"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-1/3 border rounded py-2 px-4 focus:outline-none focus:bg-yellow-100/30 mr-4"
          />
          <button
            onClick={() => generate(description)}
            className="border bg-gradient-to-r from-yellow-400 to-yellow-600 py-2 px-4 rounded"
          >
            Generate
          </button>
        </section>
        <section className="flex justify-center mt-20 w-2/3 mx-auto">
          {loading ? (
            <div
              role="status"
              className="w-full p-4 border border-gray-200 rounded shadow animate-pulse dark:border-gray-700"
            >
              <div className="flex items-center justify-center h-48 bg-gray-300 rounded dark:bg-gray-700">
                <svg
                  className="w-12 h-12 text-gray-200 dark:text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 640 512"
                >
                  <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
              </div>
            </div>
          ) : (
            <>
              {image && (
                <div className="bg-yellow-500 p-4 rounded flex justify-center w-full h-full">
                  <Image
                    src={`data:image/png;base64,${image}`}
                    alt="Next.js Logo"
                    width={600}
                    height={100}
                    priority
                  />
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default Home;
