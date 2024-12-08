// React router imports
import { Link } from "react-router-dom"

// Custom hooks imports
import useAuth from '../../hooks/useAuth'
import useTitle from "../../hooks/useTitle"

// Font awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSheetPlastic, faFileCirclePlus, faScrewdriverWrench, faUserPlus, faCalendarDays } from "@fortawesome/free-solid-svg-icons"

const Welcome = () => {

  const { username, isManager, isAdmin } = useAuth()

  useTitle(`WorkNotes: ${username}`)

  const date = new Date()
  const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

  const content = (
      <section className="welcome-section">
          <p className="date"><FontAwesomeIcon style={{fontSize:"0.9rem"}} icon={faCalendarDays} /> {today}</p>
          <h2 className="capital">welcome {username}!</h2>
          <div className="welcome-section-options">
            <p className="capital">
              <Link to="/dashboard/notes"><FontAwesomeIcon className="welcome-section-icon" icon={faSheetPlastic} /> view work notes</Link>
            </p>
            <p className="capital">
              <Link to="/dashboard/notes/new"><FontAwesomeIcon className="welcome-section-icon" icon={faFileCirclePlus} /> add new work note</Link>
            </p>
            { (isManager || isAdmin) && <p className="capital"><Link to="/dashboard/users"><FontAwesomeIcon className="welcome-section-icon" icon={faScrewdriverWrench} /> view user settings</Link></p> }
            { (isManager || isAdmin) && <p className="capital"><Link to="/dashboard/users/new"><FontAwesomeIcon className="welcome-section-icon" icon={faUserPlus} /> add new user</Link></p> }
          </div>
      </section>
  )
  return content
}

export default Welcome