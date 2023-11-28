import { useState } from "react";
import { useStickyContext } from "../../components/StickyCursor/StickyContext";
import { charactersData } from "../../const/data";
import { SecondaryLoader } from "../../components";
import styles from "./characters.module.scss";

export function Characters() {
  const [selectedCategory, setSelectedCategory] = useState(
    charactersData[0].content
  );
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const { addStickyElement } = useStickyContext();
  const createStickyElementRef = (el) => {
    el && addStickyElement(el);
  };

  return (
    <>
      <SecondaryLoader key={selectedCategory} />
      <div className={styles.characters}>
        <div className={styles.characters__wrapper}>
          <h1
            style={{ fontFamily: "Jujutsu Kaisen" }}
            className={styles.characters__wrapper__title}
          >
            Characters
          </h1>
          <div className={styles.characters__wrapper__categories}>
            {charactersData.map((data, index) => {
              return (
                <button
                  key={index}
                  ref={createStickyElementRef}
                  className={styles.characters__wrapper__categories__single}
                  onClick={() => setSelectedCategory(data.content)}
                >
                  {data.category}
                </button>
              );
            })}
          </div>
          <div className={styles.characters__container}>
            {selectedCategory?.map((character, index) => {
              return (
                <button
                  onClick={() => setSelectedCharacter(character)}
                  key={character.name}
                  className={styles.characters__container__individualCharacter}
                >
                  <div
                    className={
                      styles.characters__container__individualCharacter__background
                    }
                  />
                  <div
                    className={
                      styles.characters__container__individualCharacter__title
                    }
                  >
                    {character.name}
                  </div>
                  <img
                    loading="lazy"
                    src={character.thumbnail}
                    alt={character.name}
                    width="750"
                    height="1094"
                    className={
                      styles.characters__container__individualCharacter__img
                    }
                  />
                </button>
              );
            })}
          </div>
        </div>
        {selectedCharacter && (
          <div className={styles.selectedCharacter}>
            <button
              onClick={() => setSelectedCharacter(null)}
              className={styles.selectedCharacter__closeButton}
            >
              <img
                className={styles.selectedCharacter__closeButton__img}
                src="/closeIcon.png"
                alt="Close"
                width="450"
                height="450"
              />
            </button>
            <div className={styles.selectedCharacter__content}>
              <img
                src={selectedCharacter.thumbnail}
                alt=""
                width="750"
                height="1094"
                className={styles.selectedCharacter__content__thumbnail}
              />
              <div className={styles.selectedCharacter__content__description}>
                <h2
                  className={
                    styles.selectedCharacter__content__description__title
                  }
                >
                  {selectedCharacter.name}
                </h2>
                <p>{selectedCharacter.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
