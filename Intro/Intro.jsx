
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowDown, Sparkles } from 'lucide-react'
import mahmoudPhoto from '../../assets/images/mahmoud.png'
import './Intro.css'

function Intro() {
  const introRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      })

      tl.from('.intro-eyebrow', {
        opacity: 0,
        y: 20,
        duration: 0.8
      })
      .from('.intro-portal', {
        opacity: 0,
        scale: 0.7,
        rotate: -8,
        duration: 1.5,
        ease: 'expo.out'
      }, '-=0.3')
      .from('.intro-title', {
        opacity: 0,
        y: 35,
        duration: 1
      }, '-=0.8')
      .from('.portrait-float', {
        opacity: 0,
        y: 100,
        scale: 0.9,
        duration: 1.5,
        ease: 'power3.out'
      }, '-=0.6')
      .from('.intro-caption', {
        opacity: 0,
        y: 15,
        duration: 0.7
      }, '-=0.4')
      .from('.intro-action', {
        opacity: 0,
        y: 15,
        duration: 0.7
      }, '-=0.3')

      gsap.to('.intro-glow', {
        scale: 1.25,
        opacity: 0.7,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.to('.portrait-float', {
        y: -3,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
     })

      gsap.to('.orbit-ring', {
        rotate: 360,
        duration: 35,
        repeat: -1,
        ease: 'none'
      })

    }, introRef)

    return () => ctx.revert()
  }, [])

  const discoverProfile = () => {
    document.getElementById('profile')?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  return (
    <main className="intro" ref={introRef}>

      <div className="intro-noise" />
      <div className="intro-glow" />

      <div className="orbit-ring">
        <span />
      </div>

      <div className="intro-content">

        <span className="intro-eyebrow">
          <Sparkles size={13} />
          WELCOME TO MY DIGITAL WORLD
        </span>

        <div className="intro-portal">

          <div className="portal-inner">

            <div className="portal-light" />

            <span className="portal-tag">
              MAHMOUD <span>SHABAN</span>
            </span>

            <h1 className="intro-title">
              محمود <span>شعبان</span>
            </h1>

            <div className="portrait-backlight" />
            <div className="portrait-float">

            <img
              src={mahmoudPhoto}
              alt="محمود شعبان"
              className="portrait-image"
            />
            </div>

          </div>
        </div>

        <p className="intro-caption">
          MY CONTACT INFORMATIONS ARE HERE
        </p>

        <div className="intro-action">
          <button onClick={discoverProfile}>
             بطاقة التواصل
            <ArrowDown size={17} />
          </button>
        </div>

        <div className="intro-footer">
          <a href="https://mohamed-samir-profile.mo2868417.workers.dev/?v=1" target="_blank" rel="noopener noreferrer">
            by MS. 2026
          </a>
          <span>SCROLL TO SEE MORE</span>
          <span>01 / 11</span>
        </div>

      </div>
    </main>
  )
}

export default Intro
