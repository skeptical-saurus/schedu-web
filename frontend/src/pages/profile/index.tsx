import PersonalCalendar from "./components/personalCalendar"
import UserInfo from "./components/userInfo"

const Profile: React.FC = () => {
  return (
    <>
      <UserInfo />
      <div className='mt-24'>
        <div className='flex items-center mb-6'>
          <span className='material-icons text-3xl'>calendar_month</span>
          <span className='ml-2 text-2xl font-light'>ปฏิทินของคุณ</span>
        </div>
        <PersonalCalendar />
      </div>
    </>
  )
}

export default Profile
