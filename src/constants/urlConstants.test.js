import {
  SERVERURL,
  V1,
  PUBLIC,
  PRIVATE,
  SENDEMAIL,
  HOMEROUTE,
  LOGIN,
  ARTICLES,
  PROFILE,
  LOGINURL,
  FORGETPASSWORD,
  VERIFYOTP,
  CHANGEPASSWORD,
  RESETPASSWORD,
  VERIFYEMAIL,
  REGISTERURL,
  BLOGSURL,
  ADDBLOGSURL,
  LC150,
  LC300,
  BinarySearch,
  RECURSION,
  NUMBERTHEORY,
  TREES,
  GREEDY,
  PREFIXSUM,
  BACKTRACKING,
  SLIDINGWINDOW,
  GRAPH,
  DYNAMICPROGRAMMING,
  SocialMediaLinks,
  LEETCODE_QUERY,
  navigationTimer,
  VisualiserCommonUrl,
} from './urlConstants';

describe('URL Constants', () => {
  // --- Base URLs ---
  test('SERVERURL is the production URL', () => {
    expect(SERVERURL).toBe('https://www.lccoordinator.com');
  });

  test('V1 is constructed from SERVERURL', () => {
    expect(V1).toBe(SERVERURL + '/api/v1');
  });

  test('PUBLIC is constructed from V1', () => {
    expect(PUBLIC).toBe(V1 + '/public');
  });

  test('PRIVATE is constructed from V1', () => {
    expect(PRIVATE).toBe(V1 + '/private');
  });

  test('SENDEMAIL is constructed from PUBLIC', () => {
    expect(SENDEMAIL).toBe(PUBLIC + '/sendemail');
  });

  // --- Route constants ---
  test('HOMEROUTE is "/"', () => {
    expect(HOMEROUTE).toBe('/');
  });

  test('LOGIN is "/login"', () => {
    expect(LOGIN).toBe('/login');
  });

  test('ARTICLES is "/articles"', () => {
    expect(ARTICLES).toBe('/articles');
  });

  test('PROFILE is "/profile"', () => {
    expect(PROFILE).toBe('/profile');
  });

  // --- Auth URLs ---
  test('LOGINURL includes SERVERURL', () => {
    expect(LOGINURL).toContain(SERVERURL);
    expect(LOGINURL).toBe(SERVERURL + '/api/auth/login');
  });

  test('FORGETPASSWORD URL is correct', () => {
    expect(FORGETPASSWORD).toBe(SERVERURL + '/api/auth/forgetpassword');
  });

  test('VERIFYOTP URL is correct', () => {
    expect(VERIFYOTP).toBe(SERVERURL + '/api/auth/verifyOTP');
  });

  test('CHANGEPASSWORD URL is correct', () => {
    expect(CHANGEPASSWORD).toBe(SERVERURL + '/api/auth/changepassword');
  });

  test('RESETPASSWORD URL is correct', () => {
    expect(RESETPASSWORD).toBe(SERVERURL + '/api/auth/resetpassword');
  });

  test('VERIFYEMAIL URL is correct', () => {
    expect(VERIFYEMAIL).toBe(SERVERURL + '/api/auth/verifyEmail');
  });

  test('REGISTERURL is correct', () => {
    expect(REGISTERURL).toBe(SERVERURL + '/api/register');
  });

  // --- Article URLs ---
  test('BLOGSURL is correct', () => {
    expect(BLOGSURL).toBe(SERVERURL + '/api/articles');
  });

  test('ADDBLOGSURL is constructed from BLOGSURL', () => {
    expect(ADDBLOGSURL).toBe(BLOGSURL + '/api/addArticle');
  });

  // --- DataGrid URLs ---
  test('all datagrid URLs are built from V1', () => {
    expect(LC150).toBe(V1 + '/lc150');
    expect(LC300).toBe(V1 + '/lc300');
    expect(BinarySearch).toBe(V1 + '/bs');
    expect(RECURSION).toBe(V1 + '/recursion');
    expect(NUMBERTHEORY).toBe(V1 + '/numbertheory');
    expect(TREES).toBe(V1 + '/trees');
    expect(GREEDY).toBe(V1 + '/greedy');
    expect(PREFIXSUM).toBe(V1 + '/prefixsum');
    expect(BACKTRACKING).toBe(V1 + '/backtracking');
    expect(SLIDINGWINDOW).toBe(V1 + '/slidingwindow');
    expect(GRAPH).toBe(V1 + '/graph');
    expect(DYNAMICPROGRAMMING).toBe(V1 + '/dp');
  });

  // --- Social Media Links ---
  test('SocialMediaLinks contains all required platforms', () => {
    expect(SocialMediaLinks).toHaveProperty('linkedin');
    expect(SocialMediaLinks).toHaveProperty('github');
    expect(SocialMediaLinks).toHaveProperty('medium');
    expect(SocialMediaLinks).toHaveProperty('youtube');
    expect(SocialMediaLinks).toHaveProperty('telegram');
    expect(SocialMediaLinks).toHaveProperty('discord');
  });

  test('SocialMediaLinks URLs are valid', () => {
    Object.values(SocialMediaLinks).forEach((url) => {
      expect(url).toMatch(/^https?:\/\//);
    });
  });

  // --- LEETCODE_QUERY ---
  test('LEETCODE_QUERY generates a valid GraphQL query string', () => {
    const query = LEETCODE_QUERY('testuser');
    expect(query).toContain('testuser');
    expect(query).toContain('username');
    expect(query).toContain('profile');
    expect(query).toContain('totalAcSolved');
  });

  // --- Miscellaneous ---
  test('navigationTimer is a positive number', () => {
    expect(typeof navigationTimer).toBe('number');
    expect(navigationTimer).toBeGreaterThan(0);
  });

  test('VisualiserCommonUrl is a valid URL', () => {
    expect(VisualiserCommonUrl).toMatch(/^https?:\/\//);
  });
});
