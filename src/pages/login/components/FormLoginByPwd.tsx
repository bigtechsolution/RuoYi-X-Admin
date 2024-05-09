import { LockOutlined,  UserOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';

const FormLoginByPwd = () => {
  return (
    <>
      <ProFormText
        name="username"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined />,
        }}
        placeholder="admin"
        initialValue="admin"
        rules={[
          {
            required: true,
            message: '유저네임은 필수입니다',
          },
        ]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined />,
        }}
        placeholder="admin123"
        initialValue="ihomet1!"
        rules={[
          {
            required: true,
            message: '비밀번호는 필수입니다.',
          },
        ]}
      />

      {/* <ProFormGroup> */}
      {/*   <ProFormText */}
      {/*     width={160} */}
      {/*     name="code" */}
      {/*     placeholder="请输入验证码" */}
      {/*     fieldProps={{ */}
      {/*       size: 'large', */}
      {/*       prefix: <SafetyCertificateOutlined />, */}
      {/*     }} */}
      {/*     rules={[ */}
      {/*       { */}
      {/*         required: true, */}
      {/*         message: '请输入验证码', */}
      {/*       }, */}
      {/*     ]} */}
      {/*   /> */}

      {/*   <div className="h-[40px] w-[135px] rounded-md cursor-pointer border border-solid border-gray-300"> */}
      {/*     {captchaImageSrc ? ( */}
      {/*       <Image */}
      {/*         src={`data:image/png;base64,${captchaImageSrc}`} */}
      {/*         preview={false} */}
      {/*         height={40} */}
      {/*         width={135} */}
      {/*         alt="图片验证码" */}
      {/*         onClick={onCaptchaImageClick} */}
      {/*         className="rounded-md" */}
      {/*       /> */}
      {/*     ) : ( */}
      {/*       <Skeleton.Button active block size="large" /> */}
      {/*     )} */}
      {/*   </div> */}
      {/* </ProFormGroup> */}
    </>
  );
};

export default FormLoginByPwd;
