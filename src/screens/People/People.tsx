import cl from './People.module.scss'

const People = () => {
  return (
    <section className={cl.usersIFollowSection}>
      <nav className={cl.usersNav}>
        <div className={cl.usersNavItem}>People I follow</div>
        <div className={cl.usersNavItem}>Find Developers</div>
        <div className={cl.usersNavItem}>Placeholder</div>
        <div className={`${cl.usersNavItem} ${cl.active}`}>Placeholder</div>
        <div className={cl.usersNavItem}>Placeholder</div>
      </nav>
    </section>
  )
}

export default People