const init = () => {
    const center = document.querySelector('.center')
    const list = document.querySelector('.center ul')
    const profileImgs = document.querySelectorAll('.profile-img img')
    const imgsContainer = document.querySelector('.imgs-container')
    const coverWrapper = document.querySelector('.cover-wrapper')
    const coverImg = coverWrapper.querySelector('.cover-img img')
    const preview = document.createElement('div')

    const imgs = [
        'https://images.unsplash.com/photo-1503327431567-3ab5e6e79140?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGQlMjB3YWxscGFwZXIlMjBhbmRyb2lkJTIwd2FsbHBhcGVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
        'https://images.unsplash.com/photo-1611068813580-b07ef920964b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbHBhcGVyJTIwZm9yJTIwbW9iaWxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
        'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhbnQlMjB3YWxscGFwZXJ8ZW58MHx8MHx8&w=1000&q=80',
        'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGVjaG5vbG9neSUyMHdhbGxwYXBlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
        'https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMDY1OTc2fHxlbnwwfHx8fA%3D%3D&w=1000&q=80',
        'https://www.enwallpaper.com/wp-content/uploads/88a9e84f3a3d7e199fdbf750a1e8d65b-1.jpg'
    ]

    for (let i=0; i<imgs.length; i++) {
        addImg(imgs[i], elem => {
            if (i < 3) {
                preview.classList.add('preview')
                preview.append(elem)
                imgsContainer.append(preview)
            }
        })
    }
    
    getData('http://api.github.com/users/hamdi4-beep').then(user => {
        const profileInfo = document.querySelector('.profile-info')
        const p = document.createElement('p')
        const { avatar_url, login } = user
        
        for (const img of profileImgs) {
            img.src = avatar_url
        }

        p.textContent = `@${login}`
        profileInfo.append(p)
    })

    list.addEventListener('pointerdown', e => {
        if (e.target.tagName == 'LI') {
            const li = e.target

            for (const elem of list.querySelectorAll('li')) {
                if (li == elem) {
                    li.classList.add('clicked')
                } else {
                    elem.classList.remove('clicked')
                }
            }
        }
    })

    imgsContainer.addEventListener('pointerdown', e => {
        const target = e.target.parentElement
        const preview = target.parentNode
        const options = { behavior: 'smooth' }

        if (preview.className == 'preview') {
            const lastChild = preview.lastChild

            if (target != lastChild) {
                preview.scrollBy({
                    top: target.clientHeight,
                    behavior: 'smooth'
                })
            } else {
                preview.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
            }
        }

        coverImg.src = e.target.src
    })

    coverWrapper.addEventListener('pointerdown', e => {
        if (e.target.className == 'fas fa-image') uploadImg(coverImg)
    })

    profileImgs[1].addEventListener('pointerdown', e => {
        const img = e.target
        uploadImg(img)
    })

    async function getData(url) {
        const response = await fetch(url)
        const body = await response.json()
        return body
    }

    function addImg(url, fn) {
        const div = document.createElement('div')
        const img = new Image
        img.src = url
        div.classList.add('img-wrapper')
        div.append(img)
        imgsContainer.append(div)
        fn && fn(div)
    }

    function uploadImg(elem) {
        const input = document.createElement('input')
        input.type = 'file'
        input.click()

        input.onchange = function() {
            if (this.files[0]) {
                const file = this.files[0]
                const type = file.type

                if (type.split('/')[0] == 'image') {
                    elem.src = URL.createObjectURL(file)
                }
            }
        }

        input.remove()
    }
}

window.onload = init