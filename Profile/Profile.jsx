
import { useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'
import { profile } from '../../data/profile'
import Contact from '../Contact/Contact'
import './Profile.css'

function Profile() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(section)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`profile-section ${isVisible ? 'profile-visible' : ''}`}
      id="profile"
    >
      <div className="profile-background-glow" />

      <div className="profile-card">

        <div className="profile-cover">

          <div className="cover-grid" />
          <div className="cover-glow" />

          {/* Name Behind Portrait */}
          <h2 className="profile-cover-name">
            محمود <span>شعبان</span>
          </h2>

          {/* Floating Portrait */}
          <div className="profile-photo-wrap">
            <img
              src={profile.image}
              alt={profile.name}
              className="profile-avatar"
            />
          </div>

        </div>

        <div className="profile-information">
            <h2>{profile.name}</h2>

          <div className="profile-title">
            {profile.title}
            <span className="profile-separator">|</span>
            <span className="profile-arabic">
              محمود شعبان
            </span>
          </div>

          <div className="profile-location">
            <MapPin size={14} />
            Egypt
          </div>

          <p className="profile-description">
            {profile.description}
          </p>

          <Contact />

          <div className="profile-bottom-text">
            CONNECT WITH ME · ANYTIME · ANYWHERE
          </div>

        </div>

      </div>
    </section>
  )
}

export default Profile
