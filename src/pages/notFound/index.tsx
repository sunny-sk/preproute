
import Seo from "@/components/seo"

const NotFoundPage = () => {
  return (
    <>
      <Seo
        title="Page Not Found | Preproute"
        description="The page you are looking for does not exist."
        path="/404"
        noIndex
      />
      <div>Not Found</div>
    </>
  )
}

export default NotFoundPage
