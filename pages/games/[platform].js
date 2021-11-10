import BaseLayout from "../../layouts/BaseLayout";
import { useRouter } from "next/router";

export default function Platform() {
  const { query } = useRouter();

  return (
    <BaseLayout className="platform">
      <h1>Platform: {query.platform}</h1>
    </BaseLayout>
  );
}
