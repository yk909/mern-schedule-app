import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getInvites } from '../../features/invite/inviteSlice';
import './styles/InviteCard.css';

const Invites = () => {
    const dispatch = useDispatch();
    const {invites, invitesSent, isLoading, isError, isSuccess, msg} = useSelector(state => state.invite);

    useEffect(() => {
        if(isSuccess) {
            toast.success(msg);
        }
        if(isError) {
            toast.error(msg);
        }
    }, [isError, isSuccess]);

    useEffect(() => {
        dispatch(getInvites());
    }, [dispatch]);

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
                            <div className="btn btn-outline-danger">Reject</div>
                            <div className="btn btn-outline-primary">Accept</div>
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
                            <div className="btn btn-outline-danger">Cancel</div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Invites