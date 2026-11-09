
import { useState } from 'react'

import {

  Download,
  QrCode,
  X,
  Copy,
} from 'lucide-react'

import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaSnapchatGhost,
  FaTelegramPlane,
  FaPhone,
  FaWhatsapp,
} from 'react-icons/fa'

import { QRCodeCanvas } from 'qrcode.react'

import { profile } from '../../data/profile'
import './Contact.css'

const socials = [
  { name: 'Facebook', icon: FaFacebookF, url: profile.links.facebook },
  { name: 'Instagram', icon: FaInstagram, url: profile.links.instagram },
  { name: 'TikTok', icon: FaTiktok, url: profile.links.tiktok },
  { name: 'Snapchat', icon: FaSnapchatGhost, url: profile.links.snapchat },
  { name: 'Telegram', icon: FaTelegramPlane, url: profile.links.telegram },
  { name: 'Phone', icon: FaPhone, url: profile.links.phone },
]

function saveContact() {
  const vCard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${profile.name}`,
    `TEL;TYPE=CELL:${profile.phone}`,
    `URL:${profile.links.instagram}`,
    'END:VCARD',
  ].join('\r\n')

  const blob = new Blob([vCard], {
    type: 'text/vcard;charset=utf-8',
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = 'Mahmoud-Shaban.vcf'
  link.click()

  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

async function shareProfile() {
  const shareData = {
    title: profile.name,
    text: `تواصل مع ${profile.name} من خلال بطاقته الرقمية`,
    url: window.location.href,
  }

  try {
    if (navigator.share) {
      await navigator.share(shareData)
    } else if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(window.location.href)
      alert('تم نسخ رابط البطاقة بنجاح')
    } else {
      window.prompt('انسخ رابط البطاقة:', window.location.href)
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Share failed:', error)
    }
  }
}

function downloadQR() {
  const canvas = document.querySelector('#profile-qr canvas')
  if (!canvas) return

  const link = document.createElement('a')
  link.download = 'Mahmoud-Shaban-QR.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
}

function Contact() {
  const [showQR, setShowQR] = useState(false)

  return (
    <div className="contact-area">

      <a
        href={profile.links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-button whatsapp-button"
      >
        <FaWhatsapp size={22} />
        محادثة واتساب مباشرة
      </a>

      <button
        className="contact-button save-button"
        onClick={saveContact}
      >
        <Download size={21} />
        حفظ الرقم في جهات الاتصال
      </button>

      <button
        className="contact-button qr-button"
        onClick={() => setShowQR(true)}
      >
        <QrCode size={21} />
        مشاركة QR Code
      </button>

      <div className="contact-divider" />

      <div className="social-links">
        {socials.map((social) => {
          const Icon = social.icon

          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              title={social.name}
              className="social-button"
            >
              <Icon size={21} />
            </a>
          )
        })}
      </div>

      

      <p className="contact-hint">
        اضغط على أي منصة للتواصل المباشر
      </p>

      <div
        className={`qr-overlay ${showQR ? 'active' : ''}`}
        onClick={() => setShowQR(false)}
      >
        {showQR && (
          <div
            className="qr-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="qr-close"
              onClick={() => setShowQR(false)}
              aria-label="إغلاق"
            >
              <X size={21} />
            </button>

            <div className="qr-modal-icon">
              <QrCode size={27} />
            </div>

            <h3>امسح الكود للتواصل</h3>

            <p>
              امسح الكود لفتح بطاقة محمود والوصول إلى جميع حساباته
            </p>

            <div className="qr-image" id="profile-qr">
              <QRCodeCanvas
                value={window.location.href}
                size={220}
                level="H"
                marginSize={3}
                bgColor="#ffffff"
                fgColor="#170b20"
              />
            </div>

            <div className="qr-modal-name">
              {profile.name}
            </div>

            <button
              className="contact-button qr-download"
              onClick={downloadQR}
            >
              <Download size={19} />
              تحميل QR Code
            </button>

            <button
              className="contact-button qr-share-link"
              onClick={shareProfile}
            >
              <Copy size={18} />
              مشاركة رابط البطاقة
            </button>

          </div>
        )}
      </div>

    </div>
  )
}

export default Contact
