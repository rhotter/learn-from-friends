import { Layout } from "@/components/basic-layout";
import { MyLearningExperiments } from "@/components/my-learning-experiments";

export default function Home() {
  return (
    <main>
      <Layout>
        <MyLearningExperiments />
      </Layout>
    </main>
  );
}
