

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <p>Task Hub &copy; {currentYear}</p>
    </footer>
  )
}

export default Footer