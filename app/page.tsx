import { Layout } from "@/components/basic-layout";
import { MyLearningExperiments } from "@/components/MyLearningExperiments";

export default function Home() {
  return (
    <main>
      <Layout>
        <MyLearningExperiments />
      </Layout>
    </main>
  );
}
