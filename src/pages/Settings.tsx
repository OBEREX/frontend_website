import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Smartphone,
  Globe,
  Palette,
  Download,
  Upload,
  Save
} from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'

// Theme options
const themes = [
  { id: 'light', name: 'Light', description: 'Clean and bright interface' },
  { id: 'dark', name: 'Dark', description: 'Easy on the eyes in low light' },
  { id: 'auto', name: 'Auto', description: 'Follows your system preference' },
]

// Expanded language options with popular world languages and African languages
const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '中文 (简体)' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली' },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල' },
  { code: 'my', name: 'Burmese', nativeName: 'မြန်မာဘာသာ' },
  { code: 'km', name: 'Khmer', nativeName: 'ខ្មែរ' },
  { code: 'lo', name: 'Lao', nativeName: 'ລາວ' },
  { code: 'mn', name: 'Mongolian', nativeName: 'Монгол' },
  { code: 'ka', name: 'Georgian', nativeName: 'ქართული' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá' },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo' },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu' },
  { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans' },
  { code: 'rw', name: 'Kinyarwanda', nativeName: 'Ikinyarwanda' },
  { code: 'lg', name: 'Luganda', nativeName: 'Luganda' },
  { code: 'ak', name: 'Akan', nativeName: 'Akan' },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali' },
  { code: 'om', name: 'Oromo', nativeName: 'Afaan Oromoo' },
  { code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ' },
  { code: 'sn', name: 'Shona', nativeName: 'chiShona' },
  { code: 'ny', name: 'Chichewa', nativeName: 'Chichewa' },
  { code: 'st', name: 'Sesotho', nativeName: 'Sesotho' },
  { code: 'tn', name: 'Setswana', nativeName: 'Setswana' },
  { code: 'ss', name: 'Swati', nativeName: 'siSwati' },
  { code: 've', name: 'Venda', nativeName: 'Tshivenda' },
  { code: 'ts', name: 'Tsonga', nativeName: 'Xitsonga' },
  { code: 'nd', name: 'Northern Ndebele', nativeName: 'isiNdebele' },
  { code: 'nr', name: 'Southern Ndebele', nativeName: 'isiNdebele' },
  { code: 'ki', name: 'Kikuyu', nativeName: 'Gĩkũyũ' },
  { code: 'lu', name: 'Luba-Katanga', nativeName: 'Tshiluba' },
  { code: 'ln', name: 'Lingala', nativeName: 'Lingála' },
  { code: 'mg', name: 'Malagasy', nativeName: 'Malagasy' },
  { code: 'rw', name: 'Kinyarwanda', nativeName: 'Ikinyarwanda' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
]

// Comprehensive timezone options with popular world cities and major African cities
const timezones = [
  // Major World Cities
  { value: 'America/New_York', label: 'New York, USA (GMT-5)', offset: '-05:00' },
  { value: 'America/Los_Angeles', label: 'Los Angeles, USA (GMT-8)', offset: '-08:00' },
  { value: 'America/Chicago', label: 'Chicago, USA (GMT-6)', offset: '-06:00' },
  { value: 'America/Toronto', label: 'Toronto, Canada (GMT-5)', offset: '-05:00' },
  { value: 'America/Vancouver', label: 'Vancouver, Canada (GMT-8)', offset: '-08:00' },
  { value: 'America/Sao_Paulo', label: 'São Paulo, Brazil (GMT-3)', offset: '-03:00' },
  { value: 'America/Mexico_City', label: 'Mexico City, Mexico (GMT-6)', offset: '-06:00' },
  { value: 'America/Buenos_Aires', label: 'Buenos Aires, Argentina (GMT-3)', offset: '-03:00' },
  { value: 'America/Santiago', label: 'Santiago, Chile (GMT-3)', offset: '-03:00' },
  { value: 'America/Lima', label: 'Lima, Peru (GMT-5)', offset: '-05:00' },
  { value: 'America/Bogota', label: 'Bogotá, Colombia (GMT-5)', offset: '-05:00' },
  { value: 'America/Caracas', label: 'Caracas, Venezuela (GMT-4)', offset: '-04:00' },
  { value: 'Europe/London', label: 'London, UK (GMT+0)', offset: '+00:00' },
  { value: 'Europe/Paris', label: 'Paris, France (GMT+1)', offset: '+01:00' },
  { value: 'Europe/Berlin', label: 'Berlin, Germany (GMT+1)', offset: '+01:00' },
  { value: 'Europe/Rome', label: 'Rome, Italy (GMT+1)', offset: '+01:00' },
  { value: 'Europe/Madrid', label: 'Madrid, Spain (GMT+1)', offset: '+01:00' },
  { value: 'Europe/Amsterdam', label: 'Amsterdam, Netherlands (GMT+1)', offset: '+01:00' },
  { value: 'Europe/Stockholm', label: 'Stockholm, Sweden (GMT+1)', offset: '+01:00' },
  { value: 'Europe/Oslo', label: 'Oslo, Norway (GMT+1)', offset: '+01:00' },
  { value: 'Europe/Copenhagen', label: 'Copenhagen, Denmark (GMT+1)', offset: '+01:00' },
  { value: 'Europe/Helsinki', label: 'Helsinki, Finland (GMT+2)', offset: '+02:00' },
  { value: 'Europe/Warsaw', label: 'Warsaw, Poland (GMT+1)', offset: '+01:00' },
  { value: 'Europe/Prague', label: 'Prague, Czech Republic (GMT+1)', offset: '+01:00' },
  { value: 'Europe/Budapest', label: 'Budapest, Hungary (GMT+1)', offset: '+01:00' },
  { value: 'Europe/Vienna', label: 'Vienna, Austria (GMT+1)', offset: '+01:00' },
  { value: 'Europe/Zurich', label: 'Zurich, Switzerland (GMT+1)', offset: '+01:00' },
  { value: 'Europe/Moscow', label: 'Moscow, Russia (GMT+3)', offset: '+03:00' },
  { value: 'Europe/Istanbul', label: 'Istanbul, Turkey (GMT+3)', offset: '+03:00' },
  { value: 'Europe/Athens', label: 'Athens, Greece (GMT+2)', offset: '+02:00' },
  { value: 'Europe/Lisbon', label: 'Lisbon, Portugal (GMT+0)', offset: '+00:00' },
  { value: 'Europe/Dublin', label: 'Dublin, Ireland (GMT+0)', offset: '+00:00' },
  { value: 'Europe/Brussels', label: 'Brussels, Belgium (GMT+1)', offset: '+01:00' },
  { value: 'Asia/Tokyo', label: 'Tokyo, Japan (GMT+9)', offset: '+09:00' },
  { value: 'Asia/Seoul', label: 'Seoul, South Korea (GMT+9)', offset: '+09:00' },
  { value: 'Asia/Shanghai', label: 'Shanghai, China (GMT+8)', offset: '+08:00' },
  { value: 'Asia/Beijing', label: 'Beijing, China (GMT+8)', offset: '+08:00' },
  { value: 'Asia/Hong_Kong', label: 'Hong Kong (GMT+8)', offset: '+08:00' },
  { value: 'Asia/Singapore', label: 'Singapore (GMT+8)', offset: '+08:00' },
  { value: 'Asia/Bangkok', label: 'Bangkok, Thailand (GMT+7)', offset: '+07:00' },
  { value: 'Asia/Jakarta', label: 'Jakarta, Indonesia (GMT+7)', offset: '+07:00' },
  { value: 'Asia/Kuala_Lumpur', label: 'Kuala Lumpur, Malaysia (GMT+8)', offset: '+08:00' },
  { value: 'Asia/Manila', label: 'Manila, Philippines (GMT+8)', offset: '+08:00' },
  { value: 'Asia/Ho_Chi_Minh', label: 'Ho Chi Minh City, Vietnam (GMT+7)', offset: '+07:00' },
  { value: 'Asia/Kolkata', label: 'Kolkata, India (GMT+5:30)', offset: '+05:30' },
  { value: 'Asia/Mumbai', label: 'Mumbai, India (GMT+5:30)', offset: '+05:30' },
  { value: 'Asia/Delhi', label: 'New Delhi, India (GMT+5:30)', offset: '+05:30' },
  { value: 'Asia/Dubai', label: 'Dubai, UAE (GMT+4)', offset: '+04:00' },
  { value: 'Asia/Riyadh', label: 'Riyadh, Saudi Arabia (GMT+3)', offset: '+03:00' },
  { value: 'Asia/Tehran', label: 'Tehran, Iran (GMT+3:30)', offset: '+03:30' },
  { value: 'Asia/Karachi', label: 'Karachi, Pakistan (GMT+5)', offset: '+05:00' },
  { value: 'Asia/Dhaka', label: 'Dhaka, Bangladesh (GMT+6)', offset: '+06:00' },
  { value: 'Asia/Yangon', label: 'Yangon, Myanmar (GMT+6:30)', offset: '+06:30' },
  { value: 'Asia/Phnom_Penh', label: 'Phnom Penh, Cambodia (GMT+7)', offset: '+07:00' },
  { value: 'Asia/Vientiane', label: 'Vientiane, Laos (GMT+7)', offset: '+07:00' },
  { value: 'Asia/Ulaanbaatar', label: 'Ulaanbaatar, Mongolia (GMT+8)', offset: '+08:00' },
  { value: 'Asia/Tashkent', label: 'Tashkent, Uzbekistan (GMT+5)', offset: '+05:00' },
  { value: 'Asia/Almaty', label: 'Almaty, Kazakhstan (GMT+6)', offset: '+06:00' },
  { value: 'Asia/Bishkek', label: 'Bishkek, Kyrgyzstan (GMT+6)', offset: '+06:00' },
  { value: 'Asia/Dushanbe', label: 'Dushanbe, Tajikistan (GMT+5)', offset: '+05:00' },
  { value: 'Asia/Ashgabat', label: 'Ashgabat, Turkmenistan (GMT+5)', offset: '+05:00' },
  { value: 'Asia/Baku', label: 'Baku, Azerbaijan (GMT+4)', offset: '+04:00' },
  { value: 'Asia/Tbilisi', label: 'Tbilisi, Georgia (GMT+4)', offset: '+04:00' },
  { value: 'Asia/Yerevan', label: 'Yerevan, Armenia (GMT+4)', offset: '+04:00' },
  { value: 'Australia/Sydney', label: 'Sydney, Australia (GMT+10)', offset: '+10:00' },
  { value: 'Australia/Melbourne', label: 'Melbourne, Australia (GMT+10)', offset: '+10:00' },
  { value: 'Australia/Perth', label: 'Perth, Australia (GMT+8)', offset: '+08:00' },
  { value: 'Australia/Brisbane', label: 'Brisbane, Australia (GMT+10)', offset: '+10:00' },
  { value: 'Australia/Adelaide', label: 'Adelaide, Australia (GMT+9:30)', offset: '+09:30' },
  { value: 'Pacific/Auckland', label: 'Auckland, New Zealand (GMT+12)', offset: '+12:00' },
  { value: 'Pacific/Fiji', label: 'Suva, Fiji (GMT+12)', offset: '+12:00' },
  { value: 'Pacific/Guam', label: 'Guam (GMT+10)', offset: '+10:00' },
  { value: 'Pacific/Honolulu', label: 'Honolulu, USA (GMT-10)', offset: '-10:00' },
  
  // Major African Cities
  { value: 'Africa/Nairobi', label: 'Nairobi, Kenya (GMT+3)', offset: '+03:00' },
  { value: 'Africa/Lagos', label: 'Lagos, Nigeria (GMT+1)', offset: '+01:00' },
  { value: 'Africa/Cairo', label: 'Cairo, Egypt (GMT+2)', offset: '+02:00' },
  { value: 'Africa/Johannesburg', label: 'Johannesburg, South Africa (GMT+2)', offset: '+02:00' },
  { value: 'Africa/Casablanca', label: 'Casablanca, Morocco (GMT+0)', offset: '+00:00' },
  { value: 'Africa/Algiers', label: 'Algiers, Algeria (GMT+1)', offset: '+01:00' },
  { value: 'Africa/Tunis', label: 'Tunis, Tunisia (GMT+1)', offset: '+01:00' },
  { value: 'Africa/Tripoli', label: 'Tripoli, Libya (GMT+2)', offset: '+02:00' },
  { value: 'Africa/Khartoum', label: 'Khartoum, Sudan (GMT+2)', offset: '+02:00' },
  { value: 'Africa/Addis_Ababa', label: 'Addis Ababa, Ethiopia (GMT+3)', offset: '+03:00' },
  { value: 'Africa/Dar_es_Salaam', label: 'Dar es Salaam, Tanzania (GMT+3)', offset: '+03:00' },
  { value: 'Africa/Kampala', label: 'Kampala, Uganda (GMT+3)', offset: '+03:00' },
  { value: 'Africa/Kigali', label: 'Kigali, Rwanda (GMT+2)', offset: '+02:00' },
  { value: 'Africa/Bujumbura', label: 'Bujumbura, Burundi (GMT+2)', offset: '+02:00' },
  { value: 'Africa/Luanda', label: 'Luanda, Angola (GMT+1)', offset: '+01:00' },
  { value: 'Africa/Kinshasa', label: 'Kinshasa, DR Congo (GMT+1)', offset: '+01:00' },
  { value: 'Africa/Lubumbashi', label: 'Lubumbashi, DR Congo (GMT+2)', offset: '+02:00' },
  { value: 'Africa/Brazzaville', label: 'Brazzaville, Republic of Congo (GMT+1)', offset: '+01:00' },
  { value: 'Africa/Libreville', label: 'Libreville, Gabon (GMT+1)', offset: '+01:00' },
  { value: 'Africa/Malabo', label: 'Malabo, Equatorial Guinea (GMT+1)', offset: '+01:00' },
  { value: 'Africa/Douala', label: 'Douala, Cameroon (GMT+1)', offset: '+01:00' },
  { value: 'Africa/Yaounde', label: 'Yaoundé, Cameroon (GMT+1)', offset: '+01:00' },
  { value: 'Africa/Bangui', label: 'Bangui, Central African Republic (GMT+1)', offset: '+01:00' },
  { value: 'Africa/Ndjamena', label: 'N\'Djamena, Chad (GMT+1)', offset: '+01:00' },
  { value: 'Africa/Niamey', label: 'Niamey, Niger (GMT+1)', offset: '+01:00' },
  { value: 'Africa/Ouagadougou', label: 'Ouagadougou, Burkina Faso (GMT+0)', offset: '+00:00' },
  { value: 'Africa/Bamako', label: 'Bamako, Mali (GMT+0)', offset: '+00:00' },
  { value: 'Africa/Dakar', label: 'Dakar, Senegal (GMT+0)', offset: '+00:00' },
  { value: 'Africa/Conakry', label: 'Conakry, Guinea (GMT+0)', offset: '+00:00' },
  { value: 'Africa/Freetown', label: 'Freetown, Sierra Leone (GMT+0)', offset: '+00:00' },
  { value: 'Africa/Monrovia', label: 'Monrovia, Liberia (GMT+0)', offset: '+00:00' },
  { value: 'Africa/Abidjan', label: 'Abidjan, Ivory Coast (GMT+0)', offset: '+00:00' },
  { value: 'Africa/Accra', label: 'Accra, Ghana (GMT+0)', offset: '+00:00' },
  { value: 'Africa/Lome', label: 'Lomé, Togo (GMT+0)', offset: '+00:00' },
  { value: 'Africa/Porto-Novo', label: 'Porto-Novo, Benin (GMT+1)', offset: '+01:00' },
  { value: 'Africa/Cotonou', label: 'Cotonou, Benin (GMT+1)', offset: '+01:00' },
  { value: 'Africa/Abuja', label: 'Abuja, Nigeria (GMT+1)', offset: '+01:00' },
  { value: 'Africa/Cape_Town', label: 'Cape Town, South Africa (GMT+2)', offset: '+02:00' },
  { value: 'Africa/Durban', label: 'Durban, South Africa (GMT+2)', offset: '+02:00' },
  { value: 'Africa/Pretoria', label: 'Pretoria, South Africa (GMT+2)', offset: '+02:00' },
  { value: 'Africa/Windhoek', label: 'Windhoek, Namibia (GMT+2)', offset: '+02:00' },
  { value: 'Africa/Gaborone', label: 'Gaborone, Botswana (GMT+2)', offset: '+02:00' },
  { value: 'Africa/Harare', label: 'Harare, Zimbabwe (GMT+2)', offset: '+02:00' },
  { value: 'Africa/Lusaka', label: 'Lusaka, Zambia (GMT+2)', offset: '+02:00' },
  { value: 'Africa/Maputo', label: 'Maputo, Mozambique (GMT+2)', offset: '+02:00' },
  { value: 'Africa/Blantyre', label: 'Blantyre, Malawi (GMT+2)', offset: '+02:00' },
  { value: 'Africa/Lilongwe', label: 'Lilongwe, Malawi (GMT+2)', offset: '+02:00' },
  { value: 'Africa/Antananarivo', label: 'Antananarivo, Madagascar (GMT+3)', offset: '+03:00' },
  { value: 'Africa/Mauritius', label: 'Port Louis, Mauritius (GMT+4)', offset: '+04:00' },
  { value: 'Africa/Seychelles', label: 'Victoria, Seychelles (GMT+4)', offset: '+04:00' },
  { value: 'Africa/Comoro', label: 'Moroni, Comoros (GMT+3)', offset: '+03:00' },
  { value: 'Africa/Djibouti', label: 'Djibouti City, Djibouti (GMT+3)', offset: '+03:00' },
  { value: 'Africa/Asmara', label: 'Asmara, Eritrea (GMT+3)', offset: '+03:00' },
  { value: 'Africa/Mogadishu', label: 'Mogadishu, Somalia (GMT+3)', offset: '+03:00' },
  { value: 'Africa/Nouakchott', label: 'Nouakchott, Mauritania (GMT+0)', offset: '+00:00' },
  { value: 'Africa/Banjul', label: 'Banjul, Gambia (GMT+0)', offset: '+00:00' },
  { value: 'Africa/Bissau', label: 'Bissau, Guinea-Bissau (GMT+0)', offset: '+00:00' },
  { value: 'Africa/Sao_Tome', label: 'São Tomé, São Tomé and Príncipe (GMT+0)', offset: '+00:00' },
  { value: 'Africa/El_Aaiun', label: 'El Aaiún, Western Sahara (GMT+0)', offset: '+00:00' },
  { value: 'UTC', label: 'UTC (GMT+0)', offset: '+00:00' },
]

export default function Settings() {
  const { theme, setTheme } = useTheme()
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [selectedTimezone, setSelectedTimezone] = useState('Africa/Nairobi')

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode)
    localStorage.setItem('language', languageCode)
    // Here you would typically trigger a language change in your app
    console.log(`Language changed to: ${languageCode}`)
  }

  const handleTimezoneChange = (timezone: string) => {
    setSelectedTimezone(timezone)
    localStorage.setItem('timezone', timezone)
    // Here you would typically update the app's timezone
    console.log(`Timezone changed to: ${timezone}`)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your account preferences and system configuration
        </p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            <a href="#profile" className="flex items-center px-3 py-2 text-sm font-medium text-primary-700 bg-primary-50 rounded-lg dark:bg-primary-900/20 dark:text-primary-300">
              <User className="mr-3 h-5 w-5" />
              Profile Settings
            </a>
            <a href="#notifications" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800">
              <Bell className="mr-3 h-5 w-5" />
              Notifications
            </a>
            <a href="#security" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800">
              <Shield className="mr-3 h-5 w-5" />
              Security
            </a>
            <a href="#billing" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800">
              <CreditCard className="mr-3 h-5 w-5" />
              Billing & Subscription
            </a>

            <a href="#appearance" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800">
              <Palette className="mr-3 h-5 w-5" />
              Appearance
            </a>
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Settings */}
          <div id="profile" className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Profile Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="h-20 w-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <button className="btn-secondary">Change Photo</button>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" defaultValue="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" defaultValue="Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" defaultValue="john.doe@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                  <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" defaultValue="+254 700 000 000" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" defaultValue="Pefoma Retail Solutions" />
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="btn-primary flex items-center">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div id="notifications" className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Email Notifications</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive email updates about your account and scans</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 dark:bg-gray-700"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Push Notifications</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get instant notifications on your mobile device</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 dark:bg-gray-700"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Weekly Reports</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive weekly summary reports via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 dark:bg-gray-700"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Low Balance Alerts</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when your account balance is low</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 dark:bg-gray-700"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security */}
          <div id="security" className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Security Settings</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Change Password</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                    <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                    <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
                  </div>
                </div>
                <button className="btn-secondary mt-4">Update Password</button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
                </div>
                <button className="btn-primary">Enable 2FA</button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Session Management</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage your active sessions and devices</p>
                </div>
                <button className="btn-secondary">View Sessions</button>
              </div>
            </div>
          </div>

          {/* Billing & Subscription */}
          <div id="billing" className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Billing & Subscription</h3>
            <div className="space-y-6">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-green-900 dark:text-green-100">Current Plan</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">Pay-per-Scan Plan</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">$0.05 per scan</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-900 dark:text-green-100">$3,350</p>
                    <p className="text-xs text-green-600 dark:text-green-400">This month</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Payment Method</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">M-Pesa •••• 1234</p>
                </div>
                <button 
                  className="btn-secondary"
                  onClick={() => {
                    // Navigate to User Management payment methods tab
                    window.location.href = '/user-management?tab=payment-methods'
                  }}
                >
                  Update
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Billing History</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Download your past invoices and receipts</p>
                </div>
                <button className="btn-secondary flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">Upgrade to Subscription</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Save $2,850/month with our unlimited plan</p>
                  </div>
                </div>
                <button className="btn-primary mt-3">Upgrade Now</button>
              </div>
            </div>
          </div>



          {/* Appearance */}
          <div id="appearance" className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Appearance</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Theme</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {themes.map((themeOption) => (
                    <label key={themeOption.id} className="relative cursor-pointer">
                      <input 
                        type="radio" 
                        name="theme" 
                        className="sr-only" 
                        checked={theme === themeOption.id}
                        onChange={() => setTheme(themeOption.id as 'light' | 'dark' | 'auto')}
                      />
                      <div className={`p-4 border-2 rounded-lg transition-all ${
                        theme === themeOption.id 
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                          : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500'
                      } ${
                        themeOption.id === 'light' ? 'bg-white dark:bg-gray-800' :
                        themeOption.id === 'dark' ? 'bg-gray-900' :
                        'bg-gray-50 dark:bg-gray-800'
                      }`}>
                        <div className={`h-8 rounded mb-2 ${
                          themeOption.id === 'light' ? 'bg-gray-100 dark:bg-gray-700' :
                          themeOption.id === 'dark' ? 'bg-gray-700' :
                          'bg-gray-200 dark:bg-gray-700'
                        }`}></div>
                        <div className={`h-4 rounded mb-1 ${
                          themeOption.id === 'light' ? 'bg-gray-200 dark:bg-gray-600' :
                          themeOption.id === 'dark' ? 'bg-gray-600' :
                          'bg-gray-300 dark:bg-gray-600'
                        }`}></div>
                        <div className={`h-4 rounded w-3/4 ${
                          themeOption.id === 'light' ? 'bg-gray-200 dark:bg-gray-600' :
                          themeOption.id === 'dark' ? 'bg-gray-600' :
                          'bg-gray-300 dark:bg-gray-600'
                        }`}></div>
                        <p className={`text-sm font-medium mt-2 ${
                          themeOption.id === 'dark' ? 'text-gray-100' : 'text-gray-900 dark:text-gray-100'
                        }`}>{themeOption.name}</p>
                        <p className={`text-xs mt-1 ${
                          themeOption.id === 'dark' ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'
                        }`}>{themeOption.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Language</h4>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                >
                  {languages.map((language) => (
                    <option key={language.code} value={language.code}>
                      {language.name} ({language.nativeName})
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Changes will be applied immediately
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Time Zone</h4>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  value={selectedTimezone}
                  onChange={(e) => handleTimezoneChange(e.target.value)}
                >
                  {timezones.map((timezone) => (
                    <option key={timezone.value} value={timezone.value}>
                      {timezone.label}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  All times will be displayed in your selected timezone
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

