import { getClient } from "@/lib/client";
import styles from "./page.module.css";
import { gql } from "@apollo/client";

const query = gql`
  query getCharacters {
    characters {
      results {
        name
        id
        image
      }
    }
  }
`;

const getCharacters = async () => {
  const { data } = await getClient().query({
    query,
  });
  return data.characters.results;
};

interface Character {
  id: number;
  name: string;
  image: string;
  __typename: string;
}

export default async function Home() {
  const characters = await getCharacters();

  return (
    <div className={styles.charactersContainer}>
      {characters.map((character: Character) => {
        return (
          <div className={styles.characterContainer} key={character.id}>
            <img
              className={styles.characterImage}
              src={character.image}
              alt={character.name}
            />
            <div className={styles.characterName}>{character.name}</div>
          </div>
        );
      })}
    </div>
  );
}
