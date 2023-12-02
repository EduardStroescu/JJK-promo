import { useEffect, useRef } from "react";
import { SecondaryLoader } from "../../components";
import styles from "./story.module.scss";
import gsap from "gsap";
import { animateStory } from "./animations";

export function Story() {
  const timeline = useRef(gsap.timeline());
  const storyRef = useRef();

  useEffect(() => {
    const context = gsap.context(() => {
      const tl = timeline.current;
      tl.add(animateStory(storyRef));
    }, storyRef);

    return () => context.revert();
  }, []);

  return (
    <>
      <SecondaryLoader />
      <div className={styles.storyWrapper}>
        <div ref={storyRef} className={styles.storyContainer}>
          <h1
            style={{ fontFamily: "Jujutsu Kaisen" }}
            className={styles.storyTitle}
          >
            Story
          </h1>
          <div className={styles.textContainer}>
            <p>
              Jujutsu Kaisen is a popular manga created by Gege Akutami,
              currently being serialized in Shueisha&apos;s Weekly Shonen Jump.
              The series began serialization in March 2018, and depicts the
              battle between a curse born from negative human emotions and a
              sorcerer who uses magic to exorcise it.
            </p>
            <p>
              To date, 24 volumes have been published, and the cumulative
              circulation of the series has exceeded an astonishing 80 million
              copies.
            </p>
            <p>
              The first season of the TV anime was broadcast on Mainichi
              Broadcasting and TBS from October 2020 to March 2021, and received
              a great response not only in Japanm but all over the world.
              Furthermore, on December 24th of the same year, ``Jujutsu Kaisen
              the Movie 0``, which depicts a story that is a prequel to the
              first season, was screened, causing a huge movement around the
              world.
            </p>
            <p>
              The second season, scheduled to air in 2023, will depict the story
              of Satoru Gojo and Suguru Natsuyu&apos;s technical college days,
              ``Kaitama/Tamaori.`` The past between Gojo and Natsuyu that was
              hinted at in the movie version is finally revealed. In addition,
              it has been decided that in two consecutive seasons, after
              &quot;Kaitama/Tamaori&quot;, a chronological story &quot;Shibuya
              Incident&quot;, that continues from the first season will be
              drawn: On October 31st, a spiritual curtain is suddenly lowered
              around Shibuya Station, which is busy with Halloween celebrations,
              trapping a large number of ordinary people. Gojo heads to Shibuya
              on his own, but it turns out to be a trap set by Natsuyu, Masato,
              and other sorcerers and cursed spirits... The members of Tokyo and
              Kyoto Jujutsu schools such as Kojo, Fushiguro, and Kugisaki, as
              well as other sorcerers, gather in Shibuya, and an unprecedented
              large-scale battle is about to begin.
            </p>
            <p>A fierce story about a curse begins to revolve again.</p>
          </div>
        </div>
      </div>
    </>
  );
}
