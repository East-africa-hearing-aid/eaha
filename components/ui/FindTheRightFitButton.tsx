import Image from "next/image"

const FindTheRightFitButton = () => {
  return (
    <a href="/about" className="relative rounded-2xl lg:rounded-4xl bg-[rgba(0,0,0,0.4)] text-white py-3 md:py-4 px-5 md:px-8 md:text-xl font-suisse-regular flex items-center gap-2 md:gap-6 transition-colors duration-300 overflow-hidden">

      Find the Right Fit
      <Image src="/Images/hearingaid.png" className="bg-orange-600 p-2 rounded-xl" alt="Hearing Aid Icon, East African Hearing Aid" width={40} height={40} />
    </a>
  )
}

export default FindTheRightFitButton