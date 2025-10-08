import { defineAction } from 'astro:actions';
import { z } from 'zod';

// 定义联系表单的验证模式
const contactFormSchema = z.object({
  name: z.string().min(1, '请输入您的姓名'),
  email: z.string().email('请输入有效的邮箱地址'),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(1, '请输入咨询内容'),
});

// 定义联系表单操作 - 使用Astro 5.14新特性
const contactAction = defineAction({
  accept: 'form',
  input: contactFormSchema,
  // 处理表单提交
  handler: async (formData) => {
    try {
      // 这里可以添加实际的表单提交逻辑，如发送邮件、保存到数据库等
      console.log('表单提交成功:', formData);
      
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        message: '感谢您的咨询！我们将在24小时内与您联系。',
        data: formData,
      };
    } catch (error) {
      console.error('表单提交失败:', error);
      return {
        success: false,
        message: '提交失败，请稍后再试。',
        error: error instanceof Error ? error.message : '未知错误',
      };
    }
  }
});

// 导出server对象，这是Astro 5.14要求的格式
export const server = {
  contactAction
};

// 也可以导出默认对象以支持不同的导入方式
export default server;