new Vue({
    el: "#app",
    data: {
        xml: ""
    },
    mounted () {
        axios.get('http://localhost:3000/xml').then(res => {
            this.xml = res.data
        })
    },
    methods: {
        saveXML () {
            axios.post('http://localhost:3000/save', {
                xml: this.xml
            }).then(res => {
                console.log(res)
            })
        }
    }
})