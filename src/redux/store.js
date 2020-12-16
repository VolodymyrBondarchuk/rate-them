
let store = {
    _state: {
        reviewsHover: {
            hr: {
                ice_brake: {
                    0.5: 'Дно-',
                    1: 'Дно',
                    1.5: '1.5',
                    2: '2',
                    2.5: '2.5',
                    3: '3',
                    3.5: '3.5',
                    4: '4',
                    4.5: '4.5',
                    5: '5 - Було класно',
                },
                attitude: {
                    0.5: 'Дно-',
                    1: 'Дно',
                    1.5: '1.5',
                    2: '2',
                    2.5: '2.5',
                    3: '3',
                    3.5: '3.5',
                    4: '4',
                    4.5: '4.5',
                    5: '5 - Було класно',
                },
                punctuality: {
                    0.5: 'Дно-',
                    1: 'Дно',
                    1.5: '1.5',
                    2: '2',
                    2.5: '2.5',
                    3: '3',
                    3.5: '3.5',
                    4: '4',
                    4.5: '4.5',
                    5: '5 - Все вчасно',
                },
                impression: {
                    0.5: 'Дно-',
                    1: 'Дно',
                    1.5: '1.5',
                    2: '2',
                    2.5: '2.5',
                    3: '3',
                    3.5: '3.5',
                    4: '4',
                    4.5: '4.5',
                    5: '5 - Круто!',
                },
                comment: ""
            },
            tech: {
                ice_brake: {
                    0.5: 'Дно-',
                    1: 'Дно',
                    1.5: '1.5',
                    2: '2',
                    2.5: '2.5',
                    3: '3',
                    3.5: '3.5',
                    4: '4',
                    4.5: '4.5',
                    5: '5 - Круто!',
                },
                attitude: {
                    0.5: 'Дно-',
                    1: 'Дно',
                    1.5: '1.5',
                    2: '2',
                    2.5: '2.5',
                    3: '3',
                    3.5: '3.5',
                    4: '4',
                    4.5: '4.5',
                    5: '5 - Круто!',
                },
                tech_questions_quality: {
                    0.5: 'Дно-',
                    1: 'Дно',
                    1.5: '1.5',
                    2: '2',
                    2.5: '2.5',
                    3: '3',
                    3.5: '3.5',
                    4: '4',
                    4.5: '4.5',
                    5: '5 - Круто!',
                },
                impression: {
                    0.5: 'Дно-',
                    1: 'Дно',
                    1.5: '1.5',
                    2: '2',
                    2.5: '2.5',
                    3: '3',
                    3.5: '3.5',
                    4: '4',
                    4.5: '4.5',
                    5: '5 - Круто!',
                },
                comment: ""
            },
            feedback: {
                feedback_on_time: {

                },
                feedback_detalization: {

                },
                comment:{

                }
            }
        },
        addReview: {
            hr: {
                ice_brake: 1,
                attitude: 4,
                punctuality: 5,
                impression: 3,
                comment: "Клас"
            },
            tech: {
                ice_brake: 1,
                attitude: 2,
                tech_questions_quality: 4,
                impression: 3,
                comment: "Таке собі"
            },
            feedback: {
                feedback_on_time: 3,
                feedback_detalization: 1,
                comment: "Фігня"
            }
        },

        reviews: []
    },
    getState(){
      return this._state;
    },
    addReview(review) {
        this._state.reviews.push(review);
        this.reRender(this._state);
    },
    subscribe(observer){
        this.reRender = observer;
    },
    reRender() {
        console.log('Rerender func in state')
    }
}


export default store;
window.store = store;

