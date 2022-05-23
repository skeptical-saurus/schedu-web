import AppointmentList from './components/AppointmentList'
import PersonalCalendar from './components/personalCalendar'
import RequestList from './components/RequestList'
import UserInfo from './components/userInfo'

const Profile: React.FC = () => {
  return (
    <>
      <UserInfo />
      <div className='mt-24'>
        <div className='flex items-center mb-6'>
          <span className='material-icons text-3xl'>calendar_month</span>
          <span className='ml-2 text-2xl font-light'>ปฏิทินของคุณ</span>
        </div>
        <div className='grid grid-cols-2 gap-8'>
          <PersonalCalendar />
          <div>
            <RequestList />
            <AppointmentList />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
