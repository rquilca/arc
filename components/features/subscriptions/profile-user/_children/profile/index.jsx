import * as React from 'react'

import { ModalConsumer } from '../../../_context/modal'
import UpdatePass from './_children/update-pass'
import UpdateProfile from './_children/update-profile'

const MiPerfil = () => {
  const { userProfile } = React.useContext(ModalConsumer)
  const { identities = [] } = userProfile
  const [identitie = { type: 'Password' }] = identities || []
  const disabledSocial = identitie.type !== 'Password'

  return (
    <div className="sign-profile_general-wrapper">
      <UpdateProfile />
      <div className="space-40" />
      <div hidden={disabledSocial}>
        <UpdatePass />
      </div>
    </div>
  )
}

export default MiPerfil
