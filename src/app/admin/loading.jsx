import dynamic from "next/dynamic"

const Loading = dynamic(() => import("./myLoader"), {
  ssr: false
})

const loading = () => {
  return (
    <>
    <Loading />
    </>
  )
}

export default loading