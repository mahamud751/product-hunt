import { auth } from "@/auth";
import ProductItem from "./product-item";

interface ActiveProductsProps {
  activeProducts: any;
  header?: string;
  total?: number;
  commentShow?: boolean;
}

const ActiveProducts: React.FC<ActiveProductsProps> = async ({
  activeProducts,
  header,
  total,
  commentShow,
}) => {
  const authenticatedUser = await auth();

  const formattedActiveProducts = activeProducts?.map((product: any) => {
    const {
      id,
      name,
      slug,
      headline,
      description,
      logo,
      releaseDate,
      website,
      twitter,
      discord,
      createdAt,
      updatedAt,
      userId,
      status,
      images,
      categories,
      comments,
      upvotes,
    } = product;

    const imageUrls = images?.map((image: any) => image?.url);
    const categoryNames = categories?.name;
    const commentsCount = comments ? comments.length : 0;

    const commentText = comments
      ? comments.map((comment: any) => ({
          id: comment.id,
          profile: comment.profilePicture,
          body: comment.body,
          user: comment.user.name,
          timestamp: comment.createdAt,
          userId: comment.user.id,
          name: comment.user.name.toLowerCase().replace(/\s/g, "_"),
          replies: comment.replies,
        }))
      : [];

    const upvotesCount = upvotes ? upvotes.length : 0;
    const upvotesData = upvotes?.map((upvote: any) => upvote?.user?.id);

    return {
      id,
      name,
      slug,
      headline,
      description,
      logo,
      releaseDate,
      website,
      twitter,
      discord,
      createdAt,
      updatedAt,
      userId,
      status,
      images: imageUrls,
      categories: categoryNames,
      commentsLength: commentsCount,
      commentData: commentText,
      upvoters: upvotesData,
      upvotes: upvotesCount,
    };
  });

  // console.log(formattedActiveProducts, "formattedActiveProducts");

  return (
    <div className="w-full">
      <div className={`flex items-center  pb-3 ${header && "border-b"}`}>
        <h1 className="text-xl font-medium">
          {header} {total && "(" + total + ")"}
        </h1>
      </div>

      <div className="space-y-2 py-6 flex flex-col">
        {formattedActiveProducts?.map((product: any, index: number) => (
          <ProductItem
            key={product.id}
            index={index}
            product={product}
            authenticatedUser={authenticatedUser}
            total={total}
            commentShow={commentShow}
          />
        ))}
      </div>
    </div>
  );
};

export default ActiveProducts;
