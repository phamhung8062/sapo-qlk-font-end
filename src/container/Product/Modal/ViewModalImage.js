import React from 'react'

export default function ViewModalImage({imagePath, viewId}) {
    return (
        <div className="modal fade" id={viewId} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <img src={imagePath} style={{width: '100%'}}></img>
                </div>
            </div>
        </div>
    )
}
