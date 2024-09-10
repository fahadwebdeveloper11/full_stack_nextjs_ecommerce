
import dynamic from "next/dynamic"

const SignIn = dynamic(() => import("./signIn"), {
  ssr: false
})

const page = () => {
  return (
    <>
      <SignIn />
    </>
  )
}

export default page