type HeadingProps = {
  title: string;
}

const Heading = ({ title }: HeadingProps) => {
  return (
    <h3 className="mb-3 text-base font-semibold text-heading">
      {title}
    </h3>
  )
}

export default Heading;