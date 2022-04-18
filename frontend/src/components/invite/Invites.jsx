import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getInvites, deleteInvite, updateInvite } from '../../features/invite/inviteSlice';
import './styles/Invite.css';

const Invites = () => {
    const dispatch = useDispatch();
    const {invites, invitesSent, isLoading, isError, isSuccess, msg} = useSelector(state => state.invite);
    const navigate = useNavigate();

    useEffect(() => {
        if(isSuccess && msg !== '') {
            toast.success(msg);
        }
        if(isError) {
            toast.error(msg);
        }
        if(msg === 'Invite accepted successfully') {
            navigate(0);
        }
    }, [isError, isSuccess]);

    useEffect(() => {
        dispatch(getInvites());
    }, []);

    return (
        <section className="invites">
            <h2 className="invites-title">Invites</h2>
            <div className="invites-container">
                {isLoading && <p>Loading...</p>}
                { invites && invites.map(invite => 
                    <div key={`invites-${invite._id}`} className="invite">
                        <div className="invite-left">
                            <p>Business</p>
                            <p>{invite.business.name}</p>
                        </div>
                        <div className="invite-right">
                            <div 
                                className="btn btn-outline-danger"
                                onClick={() => dispatch(updateInvite({_id: invite._id, status: 'rejected'}))}
                            >Reject</div>
                            <div 
                                className="btn btn-outline-primary"
                                onClick={() => dispatch(updateInvite({_id: invite._id, status: 'accepted'}))}
                            >Accept</div>
                        </div>
                    </div>
                )}
                { invitesSent && invitesSent.map(invite => 
                    <div key={`invites-${invite._id}`} className="invite">
                        <div className="invite-left">
                            <p>Email</p>
                            <p>{invite.receiver}</p>
                        </div>
                        <div className="invite-right">
                            <div
                                className="btn btn-outline-danger"
                                onClick={() => {dispatch(deleteInvite(invite._id))}}>Cancel</div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Invites