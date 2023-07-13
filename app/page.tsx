import { Layout } from "@/components/basic-layout";
import { MyLearningEvent } from "@/components/MyLearningEvent";

export default function Home() {
  return (
    <main>
      <Layout>
        <MyLearningEvent />
      </Layout>
    </main>
  );
}
