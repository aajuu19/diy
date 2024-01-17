"use server";
export async function submitComment(
  prevState: { message: string },
  commentData: FormData
) {
  const text = commentData.get("text")?.toString() ?? "";
  const author = commentData.get("author")?.toString() ?? "";
  const blogId = commentData.get("blogId")?.toString() ?? "";

  const newComment = {
    data: {
      text,
      author,
      blog_article: blogId,
      publishedAt: null,
    },
  };

  try {
    await fetch(`${process.env.STRAPI_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_COMMENT_TOKEN}`,
      },
      body: JSON.stringify(newComment),
    });

    return {
      message:
        "Vielen Dank für dein Kommentar. Nach einer Prüfung durch unsere Redaktion wird dieser freigeschaltet.",
      isSuccess: true,
      isError: false,
    };
  } catch (error) {
    return {
      message: "Ein Fehler ist aufgetreten, bitte versuche es noch einmal.",
      isError: true,
      isSuccess: false,
    };
  }
}
