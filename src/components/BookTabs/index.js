import './index.css'

const BookTabs = props => {
  const {bookTabs, tabClicked, labelChanged, isActive} = props
  const {value, label} = bookTabs

  const onClickTab = () => {
    tabClicked(value)
    labelChanged(label)
  }

  const tabBtn = isActive ? 'button-tab active-tab' : 'button-tab'

  return (
    <li className="button-tabs-container">
      <button type="button" onClick={onClickTab} className={tabBtn}>
        {label}
      </button>
    </li>
  )
}

export default BookTabs
