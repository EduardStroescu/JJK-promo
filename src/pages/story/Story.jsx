import { SecondaryLoader } from "../../components";
import styles from "./story.module.scss";

export function Story() {
  return (
    <>
      <SecondaryLoader />
      <div className={styles.storyWrapper}>
        <div className={styles.storyContainer}>
          <h1
            style={{ fontFamily: "Jujutsu Kaisen" }}
            className={styles.storyTitle}
          >
            Story
          </h1>
          <div className={styles.textContainerFirst}>
            <p>
              Jujutsu Kaisen is a manga work by Gege Akutami currently being
              serialized in Shueisha`&apos;s Weekly Shonen Jump. The series
              began serialization in March 2018, and depicts the battle between
              a curse born from negative human emotions and a sorcerer who uses
              magic to exorcise it.
            </p>
            <p>
              To date, 24 volumes have been published, and the cumulative
              circulation of the series has exceeded an astonishing 80 million
              copies . .
            </p>
            <p>
              The first season of the TV anime was broadcast on Mainichi
              Broadcasting and TBS from October 2020 to March 2021, and received
              a great response not only in Japan but all over the world.
              Furthermore, on December 24th of the same year, ``Jujutsu Kaisen
              the Movie 0``, which depicts a story that is a prequel to the
              first season, was screened, causing a huge movement around the
              world. The second season, scheduled to air in 2023, will depict
              the story of Satoru Gojo and Suguru Natsuyu`&apos;s technical
              college days, ``Kaitama/Tamaori.`` The past between Gojo and
              Natsuyu that was hinted at in the movie version is finally
              revealed. In addition, it has been decided that in two consecutive
              seasons, after &quot;Kaitama/Tamaori&quot;, a chronological story
              &quot;Shibuya Incident&quot; that continues from the first season
              will be drawn. On October 31st, a curtain is suddenly lowered
              around Shibuya Station, which is busy with Halloween celebrations,
              trapping a large number of ordinary people. Gojo heads to Shibuya
              on his own, but it turns out to be a trap set by Natsuyu, Masato,
              and other sorcerers and cursed spirits... Members of technical
              college students such as Kojo, Fushiguro, and Kugisaki, as well as
              sorcerers, gather in Shibuya, and an unprecedented large-scale
              battle is about to begin.
            </p>
            <p>A fierce story about a curse begins to revolve again.</p>
          </div>
          <div className={styles.textContainerSecond}>
            <p>
              ``Satoru Gojo will face the seal at the right time and in the
              right place, having established his own advantage.The event will
              take place on October 31st, Shibuya.``
            </p>
            <p>
              October 2018, an exchange meeting with special cursed spirits As
              tensions within Jujutsu Technical College rise after the attack,
              the identity of the informer is finally revealed. Who is the
              informant and what is his purpose?
            </p>
            <p>
              And October 31, 2018. A curtain is suddenly lowered around Shibuya
              Station, which is crowded with Halloween guests, and a large
              number of ordinary people are trapped. In addition to the advanced
              barrier technique called ``a curtain that only ordinary people can
              be trapped in, ``the upper management decided to use Gojo alone in
              order to minimize the damage due to the request to ``bring Gojo
              Satoru`` who was told through the ordinary people. Decided to
              conquer Shibuya.
            </p>
            <p>
              Natsuyu, Masato, and other sorcerers and cursed spirits set traps
              and wait, Gojo rides alone there, and Kojo, Fushiguro, Kugisaki,
              Nanami, and numerous sorcerers gather outside the ``Cho.`` An
              unprecedented large-scale curse battle between the sorcerer vs.
              the curser and the cursed spirit that has gathered in Shibuya
              begins!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
