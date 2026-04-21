import { Footer } from "~/components/footer";
import { Navigation } from "~/components/navigation";
import { VStack } from "~/components/stack";
import { PageNumber } from "~/utils/constants";
import { Background } from "./components/background";
import styles from "./styles.module.scss";

export default function Page() {
  return (
    <VStack
      gap="8px"
      className={styles.container}
      justifyContent="space-between"
      alignItems="center"
    >
      <Background />
      <div style={{ position: "fixed", top: 0, left: 0, right: 0 }}>
        <Navigation currentPage={PageNumber.About} />
      </div>
      <div />

      <Footer />
    </VStack>
  );
}

export const metadata = {
  title: "nzws.me",
};
