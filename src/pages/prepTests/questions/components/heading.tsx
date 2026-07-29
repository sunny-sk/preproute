type HeadingProps = {
  title: string;
}

const Heading = ({ title }: HeadingProps) => {
  return (
    <h3 className="mb-3 text-base font-semibold text-[#1f2a44]">
      {title}
    </h3>
  )
}

export default Heading;