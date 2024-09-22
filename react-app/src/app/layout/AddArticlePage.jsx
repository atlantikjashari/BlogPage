import React from "react";
import ArticleFormNew from "../../features/articles/form/ArticleFormNew";

export default function AddArticlePage() {
  return (
    <div>
      <ArticleFormNew cancelLinkTo='/articles' />
    </div>
  );
}
