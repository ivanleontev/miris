new Vue({
    el: "#app",
    data: {
        host: "",
        result: null,
        error: null,
        to: null,
        text: null
    },
    mounted () {
        
    },
    methods: {
        getHost () {
            axios.get('http://localhost:3000/getHost?host=' + this.host).then(res => {
                this.result = null
                this.error = null
                let address = res.data.address
                if (!address) {
                    this.error = 'не удалось определить IP адрес для ' + this.host
                    return;
                }

                this.result = 'IP адрес домена ' + this.host + ' = ' + res.data.address
            })
        },
        sendMail () {
            let data = new FormData()

            let fileInput = this.$refs.fileInput
            let file = fileInput.files[0]
            data.append('file', file)
            data.set('to', this.to)
            data.set('text', this.text)

            axios.post('http://localhost:3000/mailSend', data).then(res => {
                console.log(res)
            })
        }
    }
})