
<template>
    <Card shadow :bordered="false">
        <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="80">
            <FormItem label="姓名" prop="name">
                <Input v-model="formData.name" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="邮箱" prop="mail">
                <Input v-model="formData.mail" placeholder="Enter your e-mail"></Input>
            </FormItem>
            <FormItem label="City" prop="city">
                <Select v-model="formData.city" placeholder="Select your city">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem label="Date">
                <Row>
                    <Col span="11">
                        <FormItem prop="date">
                            <DatePicker type="date" placeholder="Select date" v-model="formData.date"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="11">
                        <FormItem prop="time">
                            <TimePicker type="time" placeholder="Select time" v-model="formData.time"></TimePicker>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="Gender" prop="gender">
                <RadioGroup v-model="formData.gender">
                    <Radio label="male">Male</Radio>
                    <Radio label="female">Female</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="Hobby" prop="interest">
                <CheckboxGroup v-model="formData.interest">
                    <Checkbox label="Eat"></Checkbox>
                    <Checkbox label="Sleep"></Checkbox>
                    <Checkbox label="Run"></Checkbox>
                    <Checkbox label="Movie"></Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="Desc" prop="desc">
                <Input v-model="formData.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formData')">Submit</Button>
                <Button type="ghost" @click="handleReset('formData')" style="margin-left: 8px">Reset</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
export default {
  data() {
    return {
      // 是否为更新数据 （false 新建，true 更新）
      update : false ,
      // 数据（每个模型的数据不同 ）
      data:{},
      // 表单数据
      formData: {
        name: "",
        mail: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: ""
      },
      formValidate: {}
    };
  },
  methods: {
    // 数据校验
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    // 重置
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style lang="less">

</style>
